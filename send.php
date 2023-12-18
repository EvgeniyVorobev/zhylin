<?php
$URL = 'https://vip.marokita.com/tracker';
$apiData = [
    'first_name' => $_POST['first_name'] ?? 'empty',
    'last_name' => $_POST['last_name'] ?? 'empty',
    'email' => $_POST['email'] ?? 'empty',
    'password' => $_POST['password'] ?? 'empty',
    'phonecc' => $_POST['phonecc'] ?? 'empty',
    'phone' => $_POST['phone'] ?? 'empty',
    'user_ip' => $_SERVER['REMOTE_ADDR'],
    'aff_sub' => $_POST['aff_sub'] ?? 'empty',
    'aff_sub2' => $_POST['aff_sub2'] ?? 'empty',
    'aff_sub3' => $_SERVER['SERVER_NAME'],
    'aff_sub4' => $_POST['aff_sub4'] ?? 'empty',
    'aff_id' => '839',
    'offer_id' => '1737',
    'orig_offer' => '4755'
];
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $URL . '?' . http_build_query($apiData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

header_remove();
http_response_code($code);
echo $response;

die;