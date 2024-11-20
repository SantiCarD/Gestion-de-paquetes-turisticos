package com.example.Servidor3DAE.services;

import com.example.Servidor3DAE.exceptions.DuplicatedIdException;
import com.example.Servidor3DAE.exceptions.PackageNotFoundException;
import com.example.Servidor3DAE.models.CulturalPackage;
import com.example.Servidor3DAE.models.Guide;
import com.example.Servidor3DAE.repositories.GuideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GuideService implements IGuideService{
    @Autowired
    private GuideRepository guideRepository;


    public List<Guide> getList() {
        return guideRepository.findAll();
    }
    @Override
    public Optional<Guide> searchGuideByName(String nombre) {
        return guideRepository.findByNombre(nombre);
    }

    @Override
    public Optional<Guide> searchGuideById(int id) {
        return guideRepository.findById(id); // Retorna null si no se encuentra
    }

    @Override
    public Guide createGuide(Guide guia) {
        // Verificar si ya existe un paquete con el mismo ID
        if (searchGuideById(guia.getId()).isPresent()) {
            throw new DuplicatedIdException("Ya existe un guia con este ID.");
        }

// El resto de las validaciones se mantienen igual
        if (guia.getNombre() == null || guia.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del guia no puede estar vacío.");
        }
        if (guia.getId() <= 0) {
            throw new IllegalArgumentException("El ID debe ser un número positivo.");
        }
        if (guia.getCalificacion() <= 0) {
            throw new IllegalArgumentException("La calificacion debe ser mayor que 0.");
        }
        if (guia.getFechaNacimiento() == null) {
            throw new IllegalArgumentException("La fecha no puede ser nula.");
        }
        if (guia.getEdad() <= 0) {
            throw new IllegalArgumentException("la edad no puede ser menor a 0.");
        }
        return guideRepository.save(guia);
    }

    @Override
    public Guide updateGuide(Guide guia) {
        // Buscar el paquete existente por ID
        Optional<Guide> guiaExistente = guideRepository.findById(guia.getId());

        // Verificar si el paquete existe
        if (guiaExistente == null) {
            throw new PackageNotFoundException("No se encontró un Guia con el ID proporcionado.");
        }

        if (guia.getNombre() == null || guia.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del paquete no puede estar vacío.");
        }
        if (guia.getId() <= 0) {
            throw new IllegalArgumentException("El ID debe ser un número positivo.");
        }
        if (guia.getCalificacion() <= 0) {
            throw new IllegalArgumentException("La calificacion debe ser mayor que 0.");
        }
        if (guia.getFechaNacimiento() == null) {
            throw new IllegalArgumentException("Las fechas de inicio y fin no pueden ser nulas.");
        }
        if (guia.getEdad() <= 0) {
            throw new IllegalArgumentException("la edad no puede ser menor a 0.");
        }

        // Actualizar los atributos del paquete

        return guideRepository.save(guia); // Retorna el paquete actualizado
    }

    @Override
    public boolean deleteGuide(int id) {
        // Buscar el paquete existente por ID
        Optional<Guide> guide = searchGuideById(id);

        // Verificar si el paquete existe
        if (guide == null) {
            throw new PackageNotFoundException("No se encontró un guia con el ID proporcionado.");
        }

        // Eliminar el paquete de la lista
        guideRepository.deleteById(id); // Intenta eliminar el paquete


        // Retornar true si se eliminó con éxito, false de lo contrario
        boolean x= false;
        if(guideRepository.findById(id).isEmpty())
        {
            x=true;
        }
        // Retornar true si se eliminó con éxito, false de lo contrario
        return x;
    }

    public List<Guide> listGuides(String filter) throws PackageNotFoundException {
        List<Guide> filtrados = new ArrayList<>();
        if (guideRepository.findAll().isEmpty()) {
            throw new PackageNotFoundException("No hay paquetes disponibles.");
        }

        if(filter.isEmpty() || filter.isBlank())
        {
            filtrados = guideRepository.findAll();
        }

        else{
            for (Guide culturalPackage : guideRepository.findAll()) {
                if(culturalPackage.getNombre().contains(filter))
                {
                    filtrados.add(culturalPackage);
                }
            }
        }
        return filtrados;
    }
}
