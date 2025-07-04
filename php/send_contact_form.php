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

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    exit('Access denied');
}

if (!$name || !$email || !$subject) {
    http_response_code(400);
    echo json_encode(["error" => "Заповніть всі обовʼязкові поля!"]);
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
    $mail->Subject = 'Нове звернення з сайту BrainyKids';
    $mail->Body = "
    <div style='font-family: Arial, sans-serif; font-size: 16px; color: #333;'>
    <h2 style='color: #ffcc00; margin-bottom: 15px;'>📝 Нове звернення користувача із сайту <a href='https://brainykids.com.ua' style='color:#17a2b8;text-decoration:none;'>brainykids.com.ua</a></h2>
    <table style='border-collapse: collapse;'>
        <tr><td style='font-weight:bold;padding:6px; white-space: nowrap;'>👤 Ім'я користувача:</td><td style='padding:6px; margin-left: 6px'>" . htmlspecialchars($name) . "</td></tr>
        <tr><td style='font-weight:bold;padding:6px; white-space: nowrap;'>✉️ Email:</td><td style='padding:6px; margin-left: 6px'>" . htmlspecialchars($email) . "</td></tr>
        <tr><td style='font-weight:bold;padding:6px; white-space: nowrap;'>📬 Тема звернення:</td><td style='padding:6px; margin-left: 6px'>" . htmlspecialchars($subject) . "</td></tr>
        <tr><td style='font-weight:bold;padding:6px;vertical-align:top; white-space: nowrap;'>💬 Повідомлення:</td><td style='padding:6px; margin-left: 6px'>" . nl2br(htmlspecialchars($message)) . "</td></tr>
    </table>
    <hr style='margin:20px 0;border:none;border-top:1px solid #ccc;'>
    <p style='font-size:12px;color:#888;'>Автоматичне повідомлення з brainykids.com.ua. Будь ласка, не відповідайте на цей лист.</p>
    </div>
    ";

    $mail->send();
    echo json_encode(["success" => true, "message" => "Звернення успішно надіслано!"]);
    exit;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Помилка надсилання: {$mail->ErrorInfo}"]);
    exit;
}
