package com.example.Servidor3DAE.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Guide {

    @Id
    private int id;  // Define "id" como la clave primaria

    @Column(nullable = false, length = 50)  // Define que "nombre" no puede ser nulo y tiene un límite de 50 caracteres
    private String nombre;

    @Column(nullable = false)  // Define que "calificacion" no puede ser nulo
    private double calificacion;

    @Column(nullable = false)  // Define que "edad" no puede ser nulo
    private int edad;

    @Column(nullable = false)  // Define que "fechaNacimiento" no puede ser nulo
    private LocalDate fechaNacimiento;

    @ManyToOne
    @JoinColumn(name = "cultural_package_id", referencedColumnName = "id", nullable = true)
    @JsonBackReference
    private CulturalPackage culturalPackage;

    public Guide(int id, String nombre, double calificacion, int edad, LocalDate fechaNacimiento) {
        this.id = id;
        this.nombre = nombre;
        this.calificacion = calificacion;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
    }
}
