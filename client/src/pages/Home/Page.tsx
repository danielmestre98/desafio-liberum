import React, { useEffect, useState } from "react";
import "./styles.scss";
import { toast } from "react-toastify";
import { Badge, Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatCNPJ } from "../../utils/masks";

interface Empresa {
    id: number;
    cnpj: string;
    razaoSocial: string;
    status: number;
}

const Home: React.FC = () => {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/api/empresa").then(({ data }) => {
            setEmpresas(data);
        });
    }, []);

    const handleTrClick = (e: any) => {
        navigate(`/empresa/${e.currentTarget.id}`);
    };

    return (
        <>
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Home</h1>
                    <Link to="/cadastro" color="primary" className="btn btn-primary sm-button">
                        <FontAwesomeIcon icon={faPlus} /> Adicionar empresa
                    </Link>
                </div>
                <Table className="mt-4 clickable" striped hover>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>CNPJ</th>
                            <th>Razão Social</th>
                            <th style={{ width: "10%" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresas.map((empresa) => (
                            <tr onClick={handleTrClick} id={empresa.id.toString()} key={empresa.id}>
                                <td>{formatCNPJ(empresa.cnpj)}</td>
                                <td>{empresa.razaoSocial}</td>
                                <td>
                                    {empresa.status == 1 ? (
                                        <Badge bg="success">Vigente</Badge>
                                    ) : (
                                        <Badge bg="primary">Expirado</Badge>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default Home;
