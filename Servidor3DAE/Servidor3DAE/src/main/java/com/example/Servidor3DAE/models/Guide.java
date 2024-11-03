package com.example.Servidor3DAE.models;

import java.time.LocalDate;

public class Guide {
    private int id;
    private String nombre;
    private double calificacion;
    private int edad;
    private LocalDate fechaNacimiento;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(double calificacion) {
        this.calificacion = calificacion;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Guide(int id, String nombre, double calificacion, int edad, LocalDate fechaNacimiento) {
        this.id = id;
        this.nombre = nombre;
        this.calificacion = calificacion;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
    }

    @Override
    public String toString() {
        return "Guide{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", calificacion=" + calificacion +
                ", edad=" + edad +
                ", fechaNacimiento=" + fechaNacimiento +
                '}';
    }
}
