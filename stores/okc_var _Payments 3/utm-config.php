<?php
// 🎯 CONFIGURAÇÃO UTM PARA HOSTINGER
// Arquivo auxiliar para capturar e processar UTMs

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Função para capturar UTMs
function captureUTMs() {
    $utms = array();
    
    // Lista de parâmetros UTM padrão
    $utm_params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    
    foreach ($utm_params as $param) {
        if (isset($_GET[$param]) && !empty($_GET[$param])) {
            $utms[$param] = sanitize_input($_GET[$param]);
        }
    }
    
    // Capturar dados adicionais
    $utms['timestamp'] = date('Y-m-d H:i:s');
    $utms['ip'] = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $utms['user_agent'] = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    $utms['referrer'] = $_SERVER['HTTP_REFERER'] ?? 'direct';
    $utms['current_url'] = $_SERVER['REQUEST_URI'] ?? '/';
    
    return $utms;
}

// Função para sanitizar entrada
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Função para salvar UTMs (opcional)
function saveUTMs($utms) {
    $log_file = 'utm_logs.txt';
    $log_entry = date('Y-m-d H:i:s') . ' - ' . json_encode($utms) . PHP_EOL;
    
    // Verificar se pode escrever arquivo
    if (is_writable('.') || is_writable($log_file)) {
        file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
        return true;
    }
    
    return false;
}

// Processar requisição
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $utms = captureUTMs();
    
    // Salvar UTMs se solicitado
    if (isset($_GET['save']) && $_GET['save'] === 'true') {
        saveUTMs($utms);
    }
    
    // Retornar resposta JSON
    echo json_encode(array(
        'status' => 'success',
        'utms' => $utms,
        'server_info' => array(
            'php_version' => phpversion(),
            'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
            'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'unknown'
        )
    ));
    
} else {
    // Método não permitido
    http_response_code(405);
    echo json_encode(array(
        'status' => 'error',
        'message' => 'Method not allowed'
    ));
}
?> 