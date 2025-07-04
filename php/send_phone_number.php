<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';
require __DIR__ . '/phpmailer/Exception.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$config = require __DIR__ . '/config.php';
$input = json_decode(file_get_contents("php://input"), true);
$phone = isset($input['phone']) ? trim($input['phone']) : null;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    exit('Access denied');
}

if (empty($phone)) {
    http_response_code(400);
    echo json_encode(["error" => "Phone number is required"]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    // $mail->SMTPDebug = 2; //for debug
    // $mail->Debugoutput = 'error_log'; //for debug
    $mail->Host = $config['email_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['email_username'];
    $mail->Password = $config['email_password'];
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom($config['email_username']);
    foreach ($config['recipients'] as $recipient) {
        $mail->addAddress($recipient);
    }
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'Новий запит з Вашого сайту, новий номер телефону.';
    $mail->Body = '<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6;">
                        <h2 style="color: #17a2b8;">📞 Новий запит з сайту brainykids.com.ua</h2>
                        <p>Клієнт залишив свій номер телефону:</p>
                        <p style="font-size: 20px; font-weight: bold; color: #007bff; margin: 10px 0;">' . htmlspecialchars($phone) . '</p>
                        <p>Будь ласка, звʼяжіться з ним якнайшвидше!</p>
                        <hr style="margin: 20px 0;">
                        <p style="font-size: 14px; color: #999;">
                            Це автоматичне повідомлення з форми зворотного звʼязку з <strong>brainykids.com.ua</strong>
                        </p>
                    </div>';

    $mail->send();
    echo json_encode(["success" => true, "message" => "Ваш номер надіслано!"]);
    exit;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Помилка надсилання: " . $e->getMessage()]);
    exit;
}
