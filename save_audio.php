<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $targetDir = 'uploads/';

    // Generar un nombre de archivo aleatorio
    $randomFileName = uniqid() . '.wav';
    $targetFile = $targetDir . $randomFileName;

    // Crear la carpeta si no existe
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0755, true); // Crea la carpeta con permisos 0755
    }

    if (move_uploaded_file($_FILES['audio']['tmp_name'], $targetFile)) {
        echo 'Audio guardado exitosamente con el nombre: ' . $randomFileName;
    } else {
        echo 'Error al guardar el audio.';
    }
} else {
    echo 'Método no permitido.';
}
