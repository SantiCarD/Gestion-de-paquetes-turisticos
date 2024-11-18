package com.example.Servidor3DAE.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CulturalPackage {

    @Column(nullable = false, length = 50)  // Define que "nombre" no puede ser nulo y tiene un límite de 50 caracteres
    private String nombre;

    @Id
    private int id;  // Define "id" como la clave primaria

    @Column(nullable = false)  // Define que "precio" no puede ser nulo
    private Double precio;

    @Column(nullable = false)  // Define que "fechaInicio" no puede ser nulo
    private LocalDateTime fechaInicio;

    @Column(nullable = false)  // Define que "fechaFin" no puede ser nulo
    private LocalDateTime fechaFin;

    @OneToMany(mappedBy = "culturalPackage", cascade = CascadeType.PERSIST)
    @JsonManagedReference   // Define una relación uno-a-muchos con la entidad Guide
    private List<Guide> guias;

    public boolean guideExist(int id) {
        for (Guide x : guias) {
            if (x.getId() == id) {
                return true;  // Si el Optional tiene valor y el id coincide, devuelve true
            }
        }
        return false;
    }
}
