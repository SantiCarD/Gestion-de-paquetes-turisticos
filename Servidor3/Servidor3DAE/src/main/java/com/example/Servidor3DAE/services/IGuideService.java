package com.example.Servidor3DAE.services;

import com.example.Servidor3DAE.models.Guide;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IGuideService {
    Optional<Guide> searchGuideByName(String nombre);
    Optional<Guide> searchGuideById(int id);
    Guide createGuide(Guide guia);
    Guide updateGuide(Guide guia);
    boolean deleteGuide(int id);
    List<Guide> listGuides(String filter);
    List<Guide> getList();

}
