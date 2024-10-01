package com.pweb.study_and_sync.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_student")
public class Student extends User {

    @Column(nullable = false) 
    private String course;
    @Column(nullable = false) 
    private Integer semester;

    @ManyToMany(mappedBy = "students")  
    private Set<Discipline> disciplines = new HashSet<>();

    public Student() {
    }

    public Student(String name, String email, String password, LocalDate birthday, String course, Integer semester) {
        super(name, email, password, birthday);
        this.course = course;
        this.semester = semester;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }
}
