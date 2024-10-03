package com.pweb.study_and_sync.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_teacher")
public class Teacher extends User {

    @Column(nullable = false) 
    private String qualification;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)  
    @JsonIgnore
    private Set<Discipline> disciplines = new HashSet<>(); 

    public Teacher() {
    }

    public Teacher(String name, String email, String password, LocalDate birthday, String qualification) {
        super(name, email, password, birthday);
        this.qualification = qualification;
    }

    public void addDiscipline(Discipline discipline) {
        disciplines.add(discipline);
        discipline.setTeacher(this);
    }

    public void removeDiscipline(Discipline discipline) {
        disciplines.remove(discipline);
        discipline.setTeacher(null);
    }

    public String getQualification() {
        return this.qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public Set<Discipline> getDisciplines() {
        return disciplines;
    }

    public void setDisciplines(Set<Discipline> disciplines) {
        this.disciplines = disciplines;
    }
}
