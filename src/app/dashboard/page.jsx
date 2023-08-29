
import { FaBox, FaChartBar, FaRegListAlt, FaTruck, FaWarehouse } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaBox className="text-blue-600 text-3xl"/>
                        <div>
                            <h3 className="text-xl font-bold">Total de Productos</h3>
                            <p className="text-gray-600">500</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaTruck className="text-blue-600 text-3xl"/>
                        <div>
                            <h3 className="text-xl font-bold">Proveedores</h3>
                            <p className="text-gray-600">50</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaRegListAlt className="text-blue-600 text-3xl"/>
                        <div>
                            <h3 className="text-xl font-bold">Reportes de Inventario</h3>
                            <p className="text-gray-600">Ver Reportes</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaWarehouse className="text-blue-600 text-3xl"/>
                        <div>
                            <h3 className="text-xl font-bold">Bajos en Stock</h3>
                            <p className="text-gray-600">20 Productos</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaChartBar className="text-blue-600 text-3xl"/>
                        <div>
                            <h3 className="text-xl font-bold">Productos con Mayor Cantidad</h3>
                            <p className="text-gray-600">Ver Lista</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaChartBar className="text-blue-600 text-3xl"/>
                        <div>
                            <h3 className="text-xl font-bold">Productos con Mayor Cantidad</h3>
                            <p className="text-gray-600">Ver Lista</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaChartBar className="text-blue-600 text-3xl"/>
                        <div>
                            <h3 className="text-xl font-bold">Productos con Mayor Cantidad</h3>
                            <p className="text-gray-600">Ver Lista</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2">
                        <FaChartBar className="text-blue-600 text-3xl"/>
                        <div>
                            <h3 className="text-xl font-bold">Productos con Mayor Cantidad</h3>
                            <p className="text-gray-600">Ver Lista</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
