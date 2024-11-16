package com.example.Servidor3DAE.repositories;

import com.example.Servidor3DAE.models.CulturalPackage;
import com.example.Servidor3DAE.models.Guide;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GuideRepository extends JpaRepository<Guide, Integer> {
    Optional<Guide> findByNombre(String nombre);
}
