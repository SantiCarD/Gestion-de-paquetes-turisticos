package com.example.Servidor3DAE.services;

import com.example.Servidor3DAE.models.Guide;

import java.time.LocalDate;
import java.util.List;

public interface IGuideService {
    Guide searchGuideByName(String nombre);
    Guide searchGuideById(int id);
    Guide createGuide(int id, String nombre, double calificacion, int edad, LocalDate fechaNacimiento);
    Guide updateGuide(int id, String nuevoNombre, Double nuevaCalificacion, int nuevaEdad, LocalDate nuevaFechaNacimiento);
    boolean deleteGuide(int id);
    List<Guide> listGuides(String filter);
    List<Guide> getList();

}
