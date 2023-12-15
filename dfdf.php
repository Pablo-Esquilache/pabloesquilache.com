<?php
/**
 * Plugin Name: Plugin de Actualización de Productos
 * Description: Este plugin actualiza los precios y cantidades de los productos en WooCommerce desde una API externa y envía cambios en WooCommerce a una API externa.
 * Version: 2.29
 * Author: Pablo Daniel Esquilache
 */

// Función para obtener datos de la API externa
function obtenerDatosDeAPIExterna() {
    try {
        // Recupera la URL de la API desde la configuración del plugin
        $api_url = get_option('api_url');
        
        if (empty($api_url)) {
            throw new Exception('La URL de la API externa no está configurada.');
        }

        // Verifica que la variable $api_url esté definida y contiene una URL válida
        if (!isset($api_url) || !filter_var($api_url, FILTER_VALIDATE_URL)) {
            throw new Exception('La URL de la API externa no está definida o no es válida.');
        }

        // Realiza la solicitud a la API externa
        $response = wp_safe_remote_get($api_url);

        if (is_wp_error($response)) {
            throw new Exception('Error al obtener datos de la API externa: ' . $response->get_error_message());
        }

        // Procesa la respuesta de la API
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        if (!is_array($data) || !isset($data['inventory'])) {
            throw new Exception('Los datos de la API externa no son válidos.');
        }

        // Después de obtener y verificar los datos de la API, devolvemos los productos
        return $data['inventory'];
    } catch (Exception $error) {
        // Si hay un error, lo registramos y devolvemos un array vacío
        error_log('Error al obtener datos de la API externa: ' . $error->getMessage());
        return [];
    }
}

// Función para actualizar productos en WooCommerce
function actualizarProductosEnWooCommerce() {
    // Verificar si la actualización está activada
    $activar_actualizacion = get_option('activar_actualizacion', 'off');
    
    if ($activar_actualizacion !== 'on') {
        // La actualización está desactivada, salir sin hacer nada
        return;
    }

    $datosDeAPIExterna = obtenerDatosDeAPIExterna();

    foreach ($datosDeAPIExterna as $producto) {
        $sku = $producto['sku'];
        $nuevaCantidad = intval($producto['qty']);
        $nuevoPrecio = floatval($producto['price']);

        // Buscar el producto en WooCommerce por SKU
        $productoEnWooCommerce = wc_get_product_id_by_sku($sku);

        if ($productoEnWooCommerce) {
            // Obtener datos actuales del producto en WooCommerce
            $productoWooCommerce = wc_get_product($productoEnWooCommerce);
            $stock_actual = $productoWooCommerce->get_stock_quantity();
            $precio_actual = (float) $productoWooCommerce->get_price();

            // Verificar si los datos son diferentes antes de actualizar
            if ($nuevaCantidad !== $stock_actual || $nuevoPrecio !== $precio_actual) {
                // Actualizar la cantidad
                wc_update_product_stock($productoEnWooCommerce, $nuevaCantidad, 'set');
                
                // Actualizar el precio
                $productoWooCommerce->set_regular_price($nuevoPrecio);
                $productoWooCommerce->set_price($nuevoPrecio);
                $productoWooCommerce->save();
                
                // Registrar mensaje de éxito
                error_log('Producto actualizado: SKU ' . $sku);
            } else {
                error_log('Producto no actualizado: SKU ' . $sku);
            }
        }
    }
}

// Función para enviar cambios a la API externa
function enviarCambiosAAPIExterna($sku, $nuevaCantidad, $nuevoPrecio, $marcaTiempo) {
    // Recupera la URL de la API externa desde la configuración del plugin
    $api_url = get_option('api_url_actualizacion');

    if (empty($api_url)) {
        error_log('URL de la API externa no configurada para actualización desde WooCommerce.');
        return;
    }

    $data = array(
        'sku' => $sku,
        'qty' => $nuevaCantidad,
        'price' => $nuevoPrecio,
        'last_updated' => $marcaTiempo  // Nuevo campo de marca de tiempo
    );

    // Realizar una solicitud HTTP PUT a la API externa
    $response = wp_safe_remote_request($api_url, array(
        'method' => 'PUT',
        'body' => json_encode($data),
        'headers' => array('Content-Type' => 'application/json'),
    ));

    if (is_wp_error($response)) {
        error_log('Error al enviar cambios a la API externa: ' . $response->get_error_message());
    } else {
        error_log('Cambios enviados a la API externa: SKU ' . $sku);
    }
}

// Agregar filtro para detectar cambios en WooCommerce y enviarlos a la API externa
function detectarCambiosEnWooCommerce($product_id, $product) {
    // Obtener SKU, cantidad y precio del producto modificado
    $sku = $product->get_sku();
    $nuevaCantidad = $product->get_stock_quantity();
    $nuevoPrecio = $product->get_price();

    // Obtener la marca de tiempo actual
    $marcaTiempo = time();

    // Enviar los cambios a la API externa y agregar marca de tiempo
    enviarCambiosAAPIExterna($sku, $nuevaCantidad, $nuevoPrecio, $marcaTiempo);
}

// Agregar el filtro que detecta cambios en WooCommerce
add_action('woocommerce_update_product', 'detectarCambiosEnWooCommerce', 10, 2);

// Programar una tarea cron para ejecutar la actualización cada X minutos (configurable)
function programarTareaCron() {
    if (!wp_next_scheduled('mi_plugin_actualizacion_event')) {
        $intervalo_actualizacion = get_option('intervalo_actualizacion', 15);
        wp_schedule_event(time(), 'every_' . $intervalo_actualizacion . '_minutes', 'mi_plugin_actualizacion_event');
    }
}
add_action('init', 'programarTareaCron');

// Función que se ejecutará en la tarea cron
function ejecutarActualizacionDesdeCron() {
    actualizarProductosEnWooCommerce();
}
add_action('mi_plugin_actualizacion_event', 'ejecutarActualizacionDesdeCron');

// Agregar intervalo de tiempo personalizado (en minutos)
function agregarIntervaloDeTiempo($schedules) {
    $intervalo_actualizacion = get_option('intervalo_actualizacion', 15);
    $schedules['every_' . $intervalo_actualizacion . '_minutes'] = array(
        'interval' => $intervalo_actualizacion * 60, // Convertir minutos a segundos
        'display' => __('Cada ' . $intervalo_actualizacion . ' minutos')
    );
    return $schedules;
}
add_filter('cron_schedules', 'agregarIntervaloDeTiempo');

// Agregar configuración de activar/desactivar actualización, intervalo de tiempo y URL de la API externa
function agregarConfiguracionDeActualizacion() {
    add_settings_section('actualizacion_settings', 'Configuración de Actualización', null, 'general');
    add_settings_field('activar_actualizacion', 'Activar Actualización', 'mostrarCampoActivarActualizacion', 'general', 'actualizacion_settings');
    add_settings_field('intervalo_actualizacion', 'Intervalo de Actualización (en minutos)', 'mostrarCampoIntervaloActualizacion', 'general', 'actualizacion_settings');
    add_settings_field('api_url', 'URL de la API Externa (para modificar desde WooCommerce)', 'mostrarCampoAPIURL', 'general', 'actualizacion_settings');
    add_settings_field('api_url_actualizacion', 'URL de la API Externa (para actualización desde WooCommerce)', 'mostrarCampoAPIURLActualizacion', 'general', 'actualizacion_settings');
    register_setting('general', 'activar_actualizacion', 'sanitize_text_field');
    register_setting('general', 'intervalo_actualizacion', 'intval');
    register_setting('general', 'api_url');
    register_setting('general', 'api_url_actualizacion');
}
add_action('admin_init', 'agregarConfiguracionDeActualizacion');

function mostrarCampoActivarActualizacion() {
    $activar_actualizacion = get_option('activar_actualizacion', 'off');
    echo '<input type="checkbox" id="activar_actualizacion" name="activar_actualizacion" value="on" ' . checked('on', $activar_actualizacion, false) . ' /> Activar Actualización';
}

function mostrarCampoIntervaloActualizacion() {
    $intervalo_actualizacion = get_option('intervalo_actualizacion', 15);
    echo '<input type="number" id="intervalo_actualizacion" name="intervalo_actualizacion" value="' . esc_attr($intervalo_actualizacion) . '" min="1" />';
}

function mostrarCampoAPIURL() {
    $api_url = get_option('api_url');
    echo '<input type="text" id="api_url" name="api_url" value="' . esc_attr($api_url) . '" />';
}
// Función para mostrar el campo de URL de la API externa (para actualización desde WooCommerce)
function mostrarCampoAPIURLActualizacion() {
    $api_url_actualizacion = get_option('api_url_actualizacion');
    echo '<input type="text" id="api_url_actualizacion" name="api_url_actualizacion" value="' . esc_attr($api_url_actualizacion) . '" />';
}

// Agregar seguimiento del clic del usuario y actualizar datos del producto
function seguimientoClicProducto($product_id) {
    // Obtener el SKU del producto
    $sku = get_post_meta($product_id, '_sku', true);

    // Obtener datos de la API externa
    $datosAPIExterna = obtenerDatosDeAPIExterna();

    foreach ($datosAPIExterna as $producto) {
        if ($producto['sku'] === $sku) {
            // Obtener información actual del producto en WooCommerce
            $productoWooCommerce = wc_get_product($product_id);
            $stock_actual = $productoWooCommerce->get_stock_quantity();
            $precio_actual = (float) $productoWooCommerce->get_price();

            // Verificar si los datos son diferentes antes de actualizar en WooCommerce
            if ($producto['qty'] !== $stock_actual || $producto['price'] !== $precio_actual) {
                // Actualizar el stock del producto en WooCommerce
                $productoWooCommerce->set_stock_quantity($producto['qty']);
                $productoWooCommerce->save();

                // Actualizar el precio
                $productoWooCommerce->set_regular_price($producto['price']);
                $productoWooCommerce->set_price($producto['price']);
                $productoWooCommerce->save();

                // Forzar una actualización de la caché de WooCommerce
                wc_delete_product_transients($product_id);

                // Registrar mensaje de éxito
                error_log('Producto actualizado desde la API externa al hacer clic: SKU ' . $sku);
            } else {
                error_log('Producto no actualizado desde la API externa al hacer clic: SKU ' . $sku);
            }

            break; // No es necesario seguir buscando
        }
    }
}

// Agregar seguimiento del clic del usuario
add_action('template_redirect', 'seguimientoClicUsuario');

// Función para agregar seguimiento del clic del usuario
function seguimientoClicUsuario() {
    if (is_product()) {
        $product_id = get_the_ID();
        seguimientoClicProducto($product_id);
    }
}
?>
