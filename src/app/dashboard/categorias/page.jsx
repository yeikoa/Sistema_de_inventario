"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function RTCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActiva, setCategoriaActiva] = useState({ categoria_id: '', nombre_categoria: '' });

    const cargarCategorias = async () => {
        const response = await axios.get('/api/categories');
        setCategorias(response.data);
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoriaActiva.nombre_categoria.trim()) {
            toast.error('El nombre de la categoría no puede estar vacío.');
            return;
        }
        if (categoriaActiva.categoria_id) {
            confirmAlert({
                title: 'Confirmar actualización',
                message: '¿Estás seguro de que quieres actualizar esta categoría?',
                buttons: [
                    {
                        label: 'Sí',
                        onClick: async () => {
                            await axios.put(`/api/categories/${categoriaActiva.categoria_id}`, categoriaActiva);
                            setCategoriaActiva({ categoria_id: '', nombre_categoria: '' });
                            cargarCategorias();
                            toast.success('Categoría actualizada con éxito.');
                        }
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        } else {
            await axios.post('/api/categories', { nombre_categoria: categoriaActiva.nombre_categoria });
            setCategoriaActiva({ categoria_id: '', nombre_categoria: '' });
            cargarCategorias();
        }
    };

    const handleDelete = (categoria_id) => {
        confirmAlert({
            title: 'Confirmar eliminación',
            message: '¿Estás seguro de que quieres eliminar esta categoría?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: async () => {
                        await axios.delete(`/api/categories/${categoria_id}`);
                        cargarCategorias();
                        toast.success('Categoría eliminada con éxito.');
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    const handleEdit = (categoria) => {
        setCategoriaActiva(categoria);
    };

    return (
        <div className='container mx-auto p-4'>
          <ToastContainer />
            <h2 className='text-2xl font-bold mb-4'>Categorías</h2>
            <div className="mb-4 flex flex-col gap-2 w-full md:w-1/2">
                <input 
                    type="text" 
                    value={categoriaActiva.nombre_categoria} 
                    onChange={(e) => setCategoriaActiva({ ...categoriaActiva, nombre_categoria: e.target.value })} 
                    placeholder="Nombre de la categoría" 
                    className="border p-2"
                />
                <button 
                    onClick={handleSubmit} 
                    className="bg-cyan-900 text-white p-2 hover:bg-cyan-800 transition duration-300 ease-in-out"
                >
                    {categoriaActiva.categoria_id ? 'Actualizar' : 'Agregar'}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categorias.map((categoria) => (
                    <div key={categoria.categoria_id} 
                         className='border p-4 rounded shadow hover:shadow-md transition bg-cyan-900 hover:bg-cyan-800 cursor-pointer'
                         onMouseEnter={(e) => e.currentTarget.classList.add('ring', 'ring-cyan-300')}
                         onMouseLeave={(e) => e.currentTarget.classList.remove('ring', 'ring-cyan-300')}>
                        <div className='flex justify-between items-center text-white'>
                            <p className='text-lg font-medium'>{categoria.nombre_categoria}</p>
                            <div>
                                <button onClick={() => handleEdit(categoria)} className="text-white hover:text-cyan-300 mx-1">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(categoria.categoria_id)} className="text-red-600 hover:text-red-800 mx-1">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RTCategorias;
