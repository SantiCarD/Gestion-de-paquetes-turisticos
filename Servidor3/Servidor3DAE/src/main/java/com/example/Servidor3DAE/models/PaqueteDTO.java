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
@AllArgsConstructor
public class PaqueteDTO {
    private String nombre;


    private int id;  // Define "id" como la clave primaria

    private Double precio;

    private LocalDateTime fechaInicio;

    private LocalDateTime fechaFin;

    private List<Integer> guiasId;
}

