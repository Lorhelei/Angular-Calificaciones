# Angular-Calificaciones

## Requerimientos

El proyecto requiere muy poco para funcionar, sin embargo, desconozco un poco que partes del proyecto son transferibles dentro del proyecto mismo sin necesitar la interacción del usuario. Mínimamente se requiere:

- Archivo Excel con plantilla 
  | Nombres | Apellido Materno | Apellido Paterno | Fecha de Nacimiento | Grado | Grupo | Calificación |
  |---------|------------------|------------------|---------------------|-------|-------|--------------|
  |Juan José| Lopez            | Lopez            | dd/MM/yyyy          | 1     | A     | 10
  
- Angular 12.x
- NodeJS 14.x
- Internet (Para la conexión hacia OpenWeather)

## ¿Cómo ejecutarlo?

Una vez instalado NodeJS y Angular, basta con clonar el proyecto y dirigirnos hacia la ubicación de la carpeta raíz mediante Linea de Comandos.

`cd /Proyecto/Angular-Calificaciones`

Una vez en la ubicación, instalamos los modulos requeridos:

`npm install`

posteriormente ingresamos el siguiente código:

`ng serve --open`

Si todo salió bien, esto abrirá una ventana en el navegador mediante el cual podremos observar el programa en funcionamiento.

## Librerías utilizadas

Para la realización de este proyecto utilicé: 

- Angular/Material
- OpenWeatherAPI
- Angular-FusionCharts
- FusionCharts
- XLSX
