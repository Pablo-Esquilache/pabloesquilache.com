<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["mail"];
    $subject = $_POST["asunto"];
    $message = $_POST["mensaje"];

    $to = "pabloesquilache@gmail.com"; // Cambia esto con tu dirección de correo electrónico

    $headers = "From: $name <$email>" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Envía el correo
    $mailSent = mail($to, $subject, $message, $headers);

    // Verifica si el correo se envió con éxito
    if ($mailSent) {
        echo "¡Correo enviado con éxito!";
    } else {
        echo "Error al enviar el correo.";
    }
}
?>
