package com.example.Servidor3DAE.repositories;

import com.example.Servidor3DAE.models.CulturalPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CulturalPackageRepository extends JpaRepository<CulturalPackage, Integer> {
    Optional<CulturalPackage> findByNombre(String nombre);


}
