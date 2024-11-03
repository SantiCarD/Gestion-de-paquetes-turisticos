package com.example.Servidor3DAE.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CulturalPackage {

    private String nombre;
    @Id
    private int id;
    private Double precio;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    /*private ArrayList<Guide> guias;
    public boolean guideExist(int i){
        for(Guide x : guias)
        {
         if(x.getId()==id)
         {
             return true;
         }
        }
        return false;
    }*/
}

