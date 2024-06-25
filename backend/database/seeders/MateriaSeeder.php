<?php

namespace Database\Seeders;

use App\Models\Materia;
use Illuminate\Database\Seeder;

class MateriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        #############################INFORMATICA##########################################    
        Materia::create([
            "nivel" => "A",
            "nombre" => "INGLES I",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Otro",
        ]);

        Materia::create([
            "nivel" => "A",
            "nombre" => "FISICA GENERAL",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Fisica",
        ]);

        Materia::create([
            "nivel" => "A",
            "nombre" => "ALGEBRA I",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Matematicas",
        ]);

        Materia::create([
            "nivel" => "A",
            "nombre" => "CALCULO I",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Matematicas",
        ]);

        Materia::create([
            "nivel" => "A",
            "nombre" => "INTRODUCCION A LA PROGRAMACION",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "B",
            "nombre" => "INGLES II",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Otro",
        ]);

        Materia::create([
            "nivel" => "B",
            "nombre" => "ALGEBRA II",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Matematicas",
        ]);

        Materia::create([
            "nivel" => "B",
            "nombre" => "CALCULO II",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Matematicas",
        ]);

        Materia::create([
            "nivel" => "B",
            "nombre" => "ELEM. DE PROGRAMACION Y ESTRUC. DE DATOS",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "B",
            "nombre" => "ARQUITECTURA DE COMPUTADORAS I",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Electrica-Electronica",
        ]);

        Materia::create([
            "nivel" => "B",
            "nombre" => "PROGRAMACION",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "C",
            "nombre" => "CALCULO NUMERICO",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Matematicas",
        ]);

        Materia::create([
            "nivel" => "C",
            "nombre" => "LOGICA",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Matematicas",
        ]);

        Materia::create([
            "nivel" => "C",
            "nombre" => "ARQUITECTURA DE COMPUTADORAS II",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Electrica-Electronica",
        ]);

        Materia::create([
            "nivel" => "C",
            "nombre" => "TEORIA DE GRAFOS",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "C",
            "nombre" => "ORGANIZACION Y METODOS",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "C",
            "nombre" => "METODOS Y TECNICAS DE PROGRAMACION",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "D",
            "nombre" => "PROBABILIDAD Y ESTADISTICA",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Matematicas",
        ]);

        Materia::create([
            "nivel" => "D",
            "nombre" => "TALLER DE PROGRAMACION EN BAJO NIVEL",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "D",
            "nombre" => "BASE DE DATOS I",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "D",
            "nombre" => "SISTEMAS DE INFORMACION I",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "D",
            "nombre" => "PROGRAMACION FUNCIONAL",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "D",
            "nombre" => "ALGORITMOS AVANZADOS",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "E",
            "nombre" => "BASE DE DATOS II",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "E",
            "nombre" => "TALLER DE SISTEMAS OPERATIVOS",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "E",
            "nombre" => "SISTEMAS DE INFORMACION II",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "E",
            "nombre" => "TEORIA DE AUTOMATAS Y LENG. FORMALES",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "E",
            "nombre" => "GRAFICACION POR COMPUTADORA",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "E",
            "nombre" => "INTELIGENCIA ARTIFICIAL I",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "F",
            "nombre" => "INGENIERIA DE SOFTWARE",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "F",
            "nombre" => "REDES DE COMPUTADORAS",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "F",
            "nombre" => "ESTRUCTURA Y SEMANTICA DE LENGUAJES DE PROGRA",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "F",
            "nombre" => "TALLER DE BASE DE DATOS",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "F",
            "nombre" => "INTELIGENCIA ARTIFICIAL II",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "F",
            "nombre" => "PROGRAMACION WEB",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "G",
            "nombre" => "SIMULACION DE SISTEMAS",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "G",
            "nombre" => "TALLER DE INGENIERIA DE SOFTWARE",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "G",
            "nombre" => "ARQUITECTURA DE SOFTWARE",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "G",
            "nombre" => "INTERACCION HUMANO COMPUTADOR",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "G",
            "nombre" => "TECNOLOGIA REDES AVANZADAS",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "H",
            "nombre" => "APLICACION DE SISTEMAS OPERATIVOS",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "H",
            "nombre" => "EVALUACION Y AUDITORIA DE SISTEMAS",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "H",
            "nombre" => "TALLER DE GRADO I",
            "tipo" => "Regular",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "H",
            "nombre" => "CONTABILIDAD BASICA",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Industrial",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "PROCESOS AGILES",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "ENTORNOS VIRTUALES DE APRENDIZAJE",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "SERVICIOS TELEMATICOS",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Electrica-Electronica",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "RECONOCIMIENTO DE VOZ",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "SEGURIDAD DE SISTEMAS",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "APLIC. INTERACTIVAS PARA TELEVISION DIGITAL",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "TALLER DE GRADO II",
            "tipo" => "TALLER DE TITULACION",
            "electiva" => false,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "CLOUD COMPUTING",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "BUSINESS INTELLIGENCE Y BIG DATA",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);

        Materia::create([
            "nivel" => "I",
            "nombre" => "CIENCIA DE DATOS Y MACHINE LEARNING",
            "tipo" => "Regular",
            "electiva" => true,
            "departamento" => "Dpto. Informatica-Sistemas",
        ]);
        ###################################################################################
        #las demas carreras
        ###################################################################################
        ######sistemas#####################################################################
        Materia::create(["nivel" => "A", "nombre" => "METODOLOGIA INVESTIGACION Y TEC COMUNICACION", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //61
        Materia::create(["nivel" => "B", "nombre" => "MATEMATICA DISCRETA", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Matematicas",]);      //64
        Materia::create(["nivel" => "C", "nombre" => "ECUACIONES DIFERENCIALES", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Matematicas",]);      //67
        Materia::create(["nivel" => "C", "nombre" => "ESTADISTICA I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Matematicas",]);      //68
        Materia::create(["nivel" => "C", "nombre" => "CIRCUITOS ELECTRONICOS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica",]);      //72
        Materia::create(["nivel" => "D", "nombre" => "ESTADISTICA II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Matematicas",]);      //73
        Materia::create(["nivel" => "D", "nombre" => "CONTABILIDAD BASICA", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Industrial",]);      //77
        Materia::create(["nivel" => "D", "nombre" => "INVESTIGACION OPERATIVA I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Industrial",]);      //78
        Materia::create(["nivel" => "E", "nombre" => "APLICACION DE SISTEMAS OPERATIVOS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //81
        Materia::create(["nivel" => "E", "nombre" => "SISTEMAS I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Industrial",]);      //83
        Materia::create(["nivel" => "E", "nombre" => "INVESTIGACION OPERATIVA II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //
        Materia::create(["nivel" => "E", "nombre" => "MERCADOTECNIA", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Industrial",]);      //85
        Materia::create(["nivel" => "F", "nombre" => "SIMULACION DE SISTEMAS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //86
        Materia::create(["nivel" => "F", "nombre" => "SISTEMAS II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //90
        Materia::create(["nivel" => "F", "nombre" => "SISTEMAS ECONOMICOS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Industrial",]);      //91
        Materia::create(["nivel" => "F", "nombre" => "REDES DE NUEVA GENERACION", "tipo" => "Regular", "electiva" => true,  "departamento" => "Dpto. Informatica-Sistemas",]);      //92
        Materia::create(["nivel" => "G", "nombre" => "GESTION DE CALIDAD DE SOFTWARE", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //94
        Materia::create(["nivel" => "G", "nombre" => "DINAMICA DE SISTEMAS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //96
        Materia::create(["nivel" => "G", "nombre" => "APLIC. INTERACTIVAS PARA TELEVISION DIGITAL", "tipo" => "Regular", "electiva" => true,  "departamento" => "Dpto. Informatica-Sistemas",]);    
        Materia::create(["nivel" => "G", "nombre" => "ELECTROTECNIA INDUSTRIAL", "tipo" => "Regular", "electiva" => true,  "departamento" => "Dpto. Electrica-Electronica",]);      //99
        Materia::create(["nivel" => "G", "nombre" => "PLANIFICACION Y EVALUACION DE PROYECTOS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Industrial",]);      //100
        Materia::create(["nivel" => "H", "nombre" => "INGLES III", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Otros",]);      //101
        Materia::create(["nivel" => "H", "nombre" => "TALLER DE SIMULACION DE SISTEMAS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //103
        Materia::create(["nivel" => "H", "nombre" => "METODOL. Y PLANIF. DE PROYECTO DE GRADO", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);
        Materia::create(["nivel" => "H", "nombre" => "SEGURIDAD DE SISTEMAS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //105
        Materia::create(["nivel" => "H", "nombre" => "INFORMATICA FORENSE", "tipo" => "Regular", "electiva" => true,  "departamento" => "Dpto. Informatica-Sistemas",]);      //106
        Materia::create(["nivel" => "H", "nombre" => "GESTION ESTRATEGICA DE EMPRESAS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Industrial",]);
        Materia::create(["nivel" => "I", "nombre" => "PROYECTO FINAL", "tipo" => "TALLER DE TITULACION", "electiva" => false, "departamento" => "Dpto. Informatica-Sistemas",]);      //108
        Materia::create(["nivel" => "I", "nombre" => "PRACTICA EMPRESARIAL", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Industrial",]);      //109
        Materia::create(["nivel" => "I", "nombre" => "PLANIF. Y CONTROL DE LA PRODUCCION I", "tipo" => "Regular", "electiva" => true,  "departamento" =>"Dpto. Industrial",]);      //115
        Materia::create(["nivel" => "I", "nombre" => "INGENIERIA ECONOMICA", "tipo" => "Regular", "electiva" => true,  "departamento" => "Dpto. Industrial",]);      //116
        Materia::create(["nivel" => "I", "nombre" => "PLANIF. Y CONTROL DE LA PRODUCCION II", "tipo" => "Regular", "electiva" => true,  "departamento" => "Dpto. Industrial",]);      //117
        Materia::create(["nivel" => "I", "nombre" => "COSTOS INDUSTRIALES", "tipo" => "Regular", "electiva" => true,  "departamento" => "Dpto. Industrial",]);      //118
        Materia::create(["nivel" => "I", "nombre" => "INGENIERIA DE METODOS Y REINGENIERIA", "tipo" => "Regular", "electiva" => true,  "departamento" => "Dpto. Industrial",]);      //119
        Materia::create(["nivel" => "J", "nombre" => "DISEÑO DE COMPILADORES", "tipo" => "Regular", "electiva" => true,  "departamento" => "Dpto. Informatica-Sistemas",]);      //120
        #########################electronica##########################################################################################
        Materia::create(["nivel" => "A", "nombre" => "FISICA BASICA I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Fisica"]);
        Materia::create(["nivel" => "B", "nombre" => "FISICA BASICA III", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Fisica"]);
        Materia::create(["nivel" => "C", "nombre" => "FISICA BASICA II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Fisica"]);
        Materia::create(["nivel" => "C", "nombre" => "VARIABLE COMPLEJA", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Matematicas"]);
        Materia::create(["nivel" => "C", "nombre" => "ELECTROMAGNETISMO", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "C", "nombre" => "CIRCUITOS ELECTRICOS II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "D", "nombre" => "TRANSFORMADAS INTEGRALES", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Matematicas"]);
        Materia::create(["nivel" => "D", "nombre" => "CIRCUITOS ELECTRICOS III", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "D", "nombre" => "ELECTRONICA ANALOGICA I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "E", "nombre" => "ELECTRONICA ANALOGICA II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "E", "nombre" => "ELECTRONICA DIGITAL I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "E", "nombre" => "ANALISIS DE SEÑALES", "tipo" => "Regular",  "electiva" => false, "departamento" =>"Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "E", "nombre" => "MEDIDAS ELECTRONICAS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "E", "nombre" => "ELECTROTECNIA INDUSTRIAL", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Industrial"]);
        Materia::create(["nivel" => "F", "nombre" => "FISICA MODERNA", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Fisica"]);
        Materia::create(["nivel" => "F", "nombre" => "TELECOMUNICACIONES I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "F", "nombre" => "LINEAS DE TRANSMISION Y PROPAGACION", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "G", "nombre" => "INSTALACIONES ELECTRICAS I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "G", "nombre" => "ELECTRONICA DE POTENCIA", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "G", "nombre" => "ELECTRONICA DIGITAL II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "G", "nombre" => "TELECOMUNICACIONES II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "H", "nombre" => "MICROPROCESADORES I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "H", "nombre" => "ROBOTICA", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "H", "nombre" => "DISEÑO DE ELECTRONICA ANALOGICA", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "H", "nombre" => "TELECOMUNICACIONES III", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "H", "nombre" => "MULTIMEDIA", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "I", "nombre" => "PROYECTO TERMINAL I", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "I", "nombre" => "MICROPROCESADORES II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "I", "nombre" => "DISEÑO DE SISTEMAS DIGITALES II", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "I", "nombre" => "TALLER DE CONTROL Y AUTOMATISMO", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "J", "nombre" => "PROYECTO TERMINAL II", "tipo" => "Taller de Titulacion", "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "J", "nombre" => "TOPICOS ELECTRONICOS (TELEFONIA BASICA)", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "J", "nombre" => "TOPICOS ELECTRONICOS (AVIONICA)", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "J", "nombre" => "COMUNICACION DE DATOS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        Materia::create(["nivel" => "J", "nombre" => "PREPARACION Y EVALUACION DE PROYECTOS", "tipo" => "Regular",  "electiva" => false, "departamento" => "Dpto. Electrica-Electronica"]);
        ###################################matematicas########################################################################################
        Materia::create(['nivel' => 'A', 'nombre' => 'GEOMETRIA', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'A', 'nombre' => 'COMPUTACION I', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'B', 'nombre' => 'ALGEBRA LINEAL', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'B', 'nombre' => 'CALCULO II', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'B', 'nombre' => 'ESTRUCTURAS DISCRETAS', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'B', 'nombre' => 'MATEMATICA COMPUTACIONAL II', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'C', 'nombre' => 'TEORIA AXIOMATICA DE CONJUNTOS', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'C', 'nombre' => 'GEOMETRIA I', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'C', 'nombre' => 'ANALISIS I', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'D', 'nombre' => 'PROBABILIDAD Y ESTADISTICA II', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'E', 'nombre' => 'ALGEBRA ABSTRACTA I', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'E', 'nombre' => 'GEOMETRIA III', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'E', 'nombre' => 'ANALISIS III', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'G', 'nombre' => 'ANALISIS FUNCIONAL', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'G', 'nombre' => 'FRACTALES', 'tipo' => 'REGULAR', 'electiva' => true, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'G', 'nombre' => 'ANALISIS NUMERICO III', 'tipo' => 'REGULAR', 'electiva' => true, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'H', 'nombre' => 'TRANSFORMADAS DE FOURIER', 'tipo' => 'REGULAR', 'electiva' => true, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'H', 'nombre' => 'TENSORES Y FORMAS', 'tipo' => 'REGULAR', 'electiva' => true, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'I', 'nombre' => 'SEMINARIO DE GRADO', 'tipo' => 'REGULAR', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'I', 'nombre' => 'TEORIA DE CONTROL', 'tipo' => 'REGULAR', 'electiva' => true, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'J', 'nombre' => 'TRABAJO DE GRADO', 'tipo' => 'TALLER DE TITULACION', 'electiva' => false, 'departamento' => "Dpto. Matematicas"]);
        ###############################civil############################################################################################
        Materia::create(['nivel' => 'A', 'nombre' => 'QUIMICA GENERAL', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Quimica"]);
        Materia::create(['nivel' => 'A', 'nombre' => 'FISICA I', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Fisica"]);
        Materia::create(['nivel' => 'A', 'nombre' => 'DIBUJO TECNICO', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'B', 'nombre' => 'FISICA II', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Fisica"]);
        Materia::create(['nivel' => 'B', 'nombre' => 'GEOMETRIA DESCRIPTIVA', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'B', 'nombre' => 'GEOLOGIA GENERAL', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Fisica"]);
        Materia::create(['nivel' => 'C', 'nombre' => 'ANALISIS VECTORIAL Y TENSORIAL', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'C', 'nombre' => 'CALCULO III', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'C', 'nombre' => 'GEOG. Y DEF. DE LOS RECURSOS NATURALES', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Biologia"]);
        Materia::create(['nivel' => 'C', 'nombre' => 'ELECTROTECNIA', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Electrica-Electronica"]);
        Materia::create(['nivel' => 'D', 'nombre' => 'COMPUTACION PARA INGENIERIA', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Informatica-Sistemas"]);
        Materia::create(['nivel' => 'D', 'nombre' => 'ESTRUCTURAS ISOSTATICAS', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Biologia"]);
        Materia::create(['nivel' => 'D', 'nombre' => 'METODOS GEODESICOS', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Quimica"]);
        Materia::create(['nivel' => 'D', 'nombre' => 'ECONOMIA POLITICA', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Industrial"]);
        Materia::create(['nivel' => 'D', 'nombre' => 'ANALISIS NUMERICO', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Matematicas"]);
        Materia::create(['nivel' => 'E', 'nombre' => 'HIDRAULICA I', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'E', 'nombre' => 'HIDROLOGIA', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Quimica"]);
        Materia::create(['nivel' => 'E', 'nombre' => 'GEOMATICA', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Biologia"]);
        Materia::create(['nivel' => 'E', 'nombre' => 'TECNOLOGIA DE LOS MATERIALES DE CONSTRUCCION', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil"]);
        Materia::create(['nivel' => 'E', 'nombre' => 'RESISTENCIA DE MATERIALES I', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Mecanica"]);
        Materia::create(['nivel' => 'F', 'nombre' => 'HIDRAULICA II', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Quimica"]);
        Materia::create(['nivel' => 'F', 'nombre' => 'RESISTENCIA DE MATERIALES II', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'F', 'nombre' => 'MECANICA DE SUELOS I', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Mecanica"]);
        Materia::create(['nivel' => 'F', 'nombre' => 'SISTEMAS DE INGENIERIA', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Informatica-Sistemas"]);
        Materia::create(['nivel' => 'G', 'nombre' => 'TRANSPORTES Y COMUNICACIONES', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Mecanica"]);
        Materia::create(['nivel' => 'G', 'nombre' => 'INGENIERIA SANITARIA I', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Biologia"]);
        Materia::create(['nivel' => 'G', 'nombre' => 'ESTRUCTURAS HIPERESTATICAS', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'G', 'nombre' => 'MECANICA DE SUELOS II', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Mecanica"]);
        Materia::create(['nivel' => 'G', 'nombre' => 'HORMIGON ARMADO I', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'G', 'nombre' => 'INGENIERIA AMBIENTAL', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Biologia"]);
        Materia::create(['nivel' => 'H', 'nombre' => 'INGENIERIA SANITARIA II', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Biologia",]);
        Materia::create(['nivel' => 'H', 'nombre' => 'MAQUINARIA Y EQUIPO DE CONSTRUCCION', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Mecanica"]);
        Materia::create(['nivel' => 'H', 'nombre' => 'MECANICA DE SUELOS APLICADA', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Mecanica"]);
        Materia::create(['nivel' => 'H', 'nombre' => 'HORMIGON ARMADO II', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'H', 'nombre' => 'MECANICA DEL MEDIO CONTINUO', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Mecanica"]);
        Materia::create(['nivel' => 'H', 'nombre' => 'ESTRUCTURAS DE MADERA Y METALICAS', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'I', 'nombre' => 'CARRETERAS I', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'I', 'nombre' => 'OBRAS HIDRAULICAS I', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Biologia"]);
        Materia::create(['nivel' => 'I', 'nombre' => 'CONSTRUCCION DE EDIFICIOS', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'I', 'nombre' => 'DIRECCION DE OBRAS Y VALUACIONES', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Fisica"]);
        Materia::create(['nivel' => 'I', 'nombre' => 'FUNDACIONES I', 'tipo' => 'REGULAR', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'I', 'nombre' => 'TALLER DE MODALIDADES DE GRADUACION I', 'tipo' => 'TALLER DE TITULACION', "electiva" => false, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'I', 'nombre' => 'ELEMENTOS FINITOS', 'tipo' => 'REGULAR', "electiva" => true, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'PUENTES', 'tipo' => 'REGULAR', "electiva" => true, 'departamento' => "Dpto. Civil"]);
        Materia::create(['nivel' => 'J', 'nombre' => 'HORMIGON PREESFORZADO', 'tipo' => 'REGULAR', "electiva" => true, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'INGENIERIA ANTISISMICA', 'tipo' => 'REGULAR', "electiva" => true, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'ESTRUCTURAS ESPECIALES', 'tipo' => 'REGULAR', "electiva" => true, 'departamento' => "Dpto. Mecanica"]);
        Materia::create(['nivel' => 'J', 'nombre' => 'FUNDACIONES II', 'tipo' => 'REGULAR', "electiva" => true, 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'CARRETERAS II', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil"]);
        Materia::create(['nivel' => 'J', 'nombre' => 'AEROPUERTOS', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'INGENIERIA DE TRAFICO', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'VIAS FERREAS', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'MODELOS HIDRAULICOS', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Biologia"]);
        Materia::create(['nivel' => 'J', 'nombre' => 'PUERTOS Y VIAS NAVEGABLES', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'HIDRAULICA DE RIOS', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'OBRAS HIDRAULICAS II', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'TALLER DE MODALIDADES DE GRADUACION II', 'tipo' => 'TALLER DE TITULACION', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'PLANTAS DE PURIFICACION DE AGUA POTABLE', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'LABORATORIO DE INGENIERIA SANITARIA', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Biologia"]);
        Materia::create(['nivel' => 'J', 'nombre' => 'INSTALACIONES DOM. CONST. DE OBRAS SANITARIAS', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Biologia"]);
        Materia::create(['nivel' => 'J', 'nombre' => 'PLANTA DE TRATAMIENTO DE AGUAS RESIDUALES', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'TEMAS ESPECIALES EN INGENIERIA GEOTECNIA', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'METODOS CONSTRUCTIVOS EN GEOTECNIA', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);
        Materia::create(['nivel' => 'J', 'nombre' => 'TEMAS ESPECIALES EN HIDRAULICA', 'tipo' => 'REGULAR', 'departamento' => "Dpto. Civil",]);

        #########################################################################################

    }
}
