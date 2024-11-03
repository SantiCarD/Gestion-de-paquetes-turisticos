package com.example.Servidor3DAE.services;

import com.example.Servidor3DAE.exceptions.DuplicatedIdException;
import com.example.Servidor3DAE.exceptions.PackageNotFoundException;
import com.example.Servidor3DAE.models.Guide;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Service
public class GuideService implements IGuideService{
    private static GuideService guideService;
    private List<Guide> guides = new ArrayList<Guide>();
    @Autowired
    private GuideService() {

    }
    @Autowired
    public static GuideService getGuideService() {
        if (guideService == null) {
            guideService = new GuideService();
        }

        return guideService;
    }

    public List<Guide> getList() {
        return guides;
    }
    @Override
    public Guide searchGuideByName(String nombre) {
        for (Guide guide : getList()) {
            if (guide.getNombre().equalsIgnoreCase(nombre)) {
                return guide; // Retorna el paquete si se encuentra
            }
        }
        return null; // Retorna null si no se encuentra
    }

    @Override
    public Guide searchGuideById(int id) {
        for (Guide guide : getList()) {
            if (guide.getId() == id) {
                return guide; // Retorna el paquete si se encuentra
            }
        }
        return null; // Retorna null si no se encuentra
    }

    @Override
    public Guide createGuide(int id, String nombre, double calificacion, int edad, LocalDate fechaNacimiento) {
        // Verificar si ya existe un paquete con el mismo ID
        if (searchGuideById(id) != null) {
            throw new DuplicatedIdException("Ya existe un guia con este ID.");
        }

// El resto de las validaciones se mantienen igual
        if (nombre == null || nombre.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del paquete no puede estar vacío.");
        }
        if (id <= 0) {
            throw new IllegalArgumentException("El ID debe ser un número positivo.");
        }
        if (calificacion <= 0) {
            throw new IllegalArgumentException("La calificacion debe ser mayor que 0.");
        }
        if (fechaNacimiento == null) {
            throw new IllegalArgumentException("Las fechas de inicio y fin no pueden ser nulas.");
        }
        if (edad <= 0) {
            throw new IllegalArgumentException("la edad no puede ser menor a 0.");
        }

        Guide guide = new Guide(id, nombre, calificacion, edad, fechaNacimiento);
        guides.add(guide);
        return guide;
    }

    @Override
    public Guide updateGuide(int id, String nuevoNombre, Double nuevaCalificacion, int nuevaEdad, LocalDate nuevaFechaNacimiento) {
        // Buscar el paquete existente por ID
        Guide guiaExistente = searchGuideById(id);

        // Verificar si el paquete existe
        if (guiaExistente == null) {
            throw new PackageNotFoundException("No se encontró un paquete con el ID proporcionado.");
        }

        if (nuevoNombre == null || nuevoNombre.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del paquete no puede estar vacío.");
        }
        if (id <= 0) {
            throw new IllegalArgumentException("El ID debe ser un número positivo.");
        }
        if (nuevaCalificacion <= 0) {
            throw new IllegalArgumentException("La calificacion debe ser mayor que 0.");
        }
        if (nuevaFechaNacimiento == null) {
            throw new IllegalArgumentException("Las fechas de inicio y fin no pueden ser nulas.");
        }
        if (nuevaEdad <= 0) {
            throw new IllegalArgumentException("la edad no puede ser menor a 0.");
        }

        // Actualizar los atributos del paquete
        guiaExistente.setNombre(nuevoNombre);
        guiaExistente.setCalificacion(nuevaCalificacion);
        guiaExistente.setFechaNacimiento(nuevaFechaNacimiento);
        guiaExistente.setEdad(nuevaEdad);

        return guiaExistente; // Retorna el paquete actualizado
    }

    @Override
    public boolean deleteGuide(int id) {
        // Buscar el paquete existente por ID
        Guide guide = searchGuideById(id);

        // Verificar si el paquete existe
        if (guide == null) {
            throw new PackageNotFoundException("No se encontró un guia con el ID proporcionado.");
        }

        // Eliminar el paquete de la lista
        boolean eliminado = guides.remove(guide); // Intenta eliminar el paquete


        // Retornar true si se eliminó con éxito, false de lo contrario
        return eliminado;
    }

    public List<Guide> listGuides(String filter) throws PackageNotFoundException {
        List<Guide> filtrados = new ArrayList<>();
        if (guides.isEmpty()) {
            throw new PackageNotFoundException("No hay paquetes disponibles.");
        }

        if(filter.isEmpty() || filter.isBlank())
        {
            filtrados = guides;
        }

        else{
            for (Guide guide : guides) {
                if(guide.getNombre().contains(filter))
                {
                    filtrados.add(guide);
                }
            }
        }
        return filtrados;
    }
}
