import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./styles.scss";
import { useNavigate, useNavigation } from "react-router-dom";

interface DadosEmpresa {
    razaoSocial: string;
    status: number;
    cnpj: string;
    dataRegistro: string;
}

interface ModalDeleteProps {
    dadosEmpresa: DadosEmpresa;
    id: any;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ dadosEmpresa, id }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        axios
            .delete(`http://localhost:3001/api/empresa/${id}`)
            .then(() => {
                toast.success("Empresa excluída com sucesso!");
                navigate("/");
            })
            .catch(() => {
                toast.error("Erro ao excluir empresa. Por favor, tente novamente");
            });
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow}>
                <FontAwesomeIcon icon={faTrash} /> Excluir empresa
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="modal-delete">
                    <Modal.Title style={{ color: "white" }}>Exluir empresa</Modal.Title>
                    <FontAwesomeIcon onClick={handleClose} className="close-button" size="xl" icon={faX} />
                </Modal.Header>
                <Modal.Body>
                    Você tem certeza que deseja <b>exluir</b> a empresa {dadosEmpresa.razaoSocial}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Excluir empresa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDelete;
