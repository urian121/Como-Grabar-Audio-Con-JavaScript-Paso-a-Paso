<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Descubre Cómo Grabar Audio Usando JavaScript:¡Paso a Paso!</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
    <link rel="stylesheet" href="assets/lista_audios.css">
</head>

<body>

    <h1>Listado de Audios</h1>

    <ul>
        <?php
        $audioDir = 'uploads/';

        if (is_dir($audioDir)) {
            $audioFiles = scandir($audioDir);

            if (count($audioFiles) <= 2) {
                echo '<p>No existen audios disponibles.</p>';
            } else {
                foreach ($audioFiles as $file) {
                    if ($file != '.' && $file != '..') {
                        $fileName = pathinfo($file, PATHINFO_FILENAME); // Obtener el nombre del archivo sin extensión
                        echo '<li>';
                        echo '<audio controls><source src="' . $audioDir . $file . '" type="audio/mpeg"></audio>';
                        echo '<p>' . $fileName . '</p>'; // Mostrar el nombre del archivo
                        echo '</li>';
                    }
                }
            }
        } else {
            echo '<p>La carpeta de audios no existe.</p>';
        }
        ?>


    </ul>

</body>

</html>