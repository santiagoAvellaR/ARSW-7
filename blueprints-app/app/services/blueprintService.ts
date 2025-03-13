import $ from "jquery";

// Definir interfaces para los datos
export interface Point {
    x: number;
    y: number;
}

export interface Blueprint {
    name: string;
    author: string;
    points: Point[];
}

const API_URL = "http://localhost:8080/api/blueprints";

// Función para obtener un Blueprint usando jQuery AJAX
export function fetchBlueprint(author: string, bpname: string): Promise<Blueprint> {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URL}/${author}/${bpname}`,
            method: "GET",
            dataType: "json",
            success: (data) => resolve(data),
            error: (xhr, status, error) => reject(new Error(`Error fetching blueprint: ${error}`)),
        });
    });
}

export function fetchBlueprints(author:string):Promise<Blueprint[]> {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URL}/${author}`,
            method: "GET",
            dataType: "json",
            success: (data:Blueprint[]) => resolve(data),
            error: (xhr, status, error) => reject(new Error(`Error fetching blueprint: ${error}`)),
        });
    });
}

export function createBlueprint(data: Blueprint): Promise<void> {
    return new Promise((resol, reje)  => {
        $.ajax({
            url: API_URL,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: () => resol(),
            error: (xhr, status, error) => reje(new Error(`Error while creating blueprint: ${error}`)),
        })
    });
}