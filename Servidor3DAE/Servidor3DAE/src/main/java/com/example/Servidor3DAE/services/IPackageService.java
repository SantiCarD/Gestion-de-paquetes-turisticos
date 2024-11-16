package com.example.Servidor3DAE.services;

import com.example.Servidor3DAE.models.CulturalPackage;

import java.util.List;
import java.util.Optional;

public interface IPackageService {

    Optional<CulturalPackage> searchPackageByName(String nombre);
    Optional<CulturalPackage> searchPackageById(int id);
    public CulturalPackage createPackage(CulturalPackage cp);
    CulturalPackage updatePackage(CulturalPackage cp);
    boolean deletePackage(int id);
    List<CulturalPackage> listPackages(String filter);
    List<CulturalPackage> getList();
    boolean guideExist(List<Integer> ints);
}
