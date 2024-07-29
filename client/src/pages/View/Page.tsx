import React, { useEffect, useState } from "react";
import { faChevronLeft, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputMask from "react-input-mask";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.scss";
import { useFormik } from "formik";
import { validationSchema } from "../../utils/validationSchema";
import axios from "axios";
import { toast } from "react-toastify";
import ModalDelete from "./Partials/ModalDelete";

interface FormValues {
    razaoSocial: string;
    status: number;
    cnpj: string;
    dataRegistro: string;
}

const View: React.FC = (props) => {
    const [edit, setEdit] = useState(false);
    const [originalValues, setOriginalValues] = useState<FormValues>({
        razaoSocial: "",
        status: 0,
        cnpj: "",
        dataRegistro: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const formik = useFormik<FormValues>({
        initialValues: {
            razaoSocial: "",
            status: 0,
            cnpj: "",
            dataRegistro: "",
        },
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission
            axios
                .put(`http://localhost:3001/api/empresa/${id}`, values)
                .then(() => {
                    toast.success("Empresa editada com sucesso!");
                    navigate("/");
                })
                .catch((errors) => {
                    if (errors.response.data.errors) {
                        toast.error(`Erro ao editar empresa: ${errors.response.data.errors.join("\n")}`);
                    } else {
                        toast.error("Erro ao editar empresa");
                    }
                });
        },
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/empresa/${id}`).then(({ data }): void => {
            formik.setValues(data);
            setOriginalValues(data);
        });
    }, []);

    const handleCancel = () => {
        formik.setValues(originalValues);
        setEdit(false);
    };
    return (
        <Container>
            <div className="d-flex align-items-center gap-3">
                <Link to="/" className="chevron-back">
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </Link>
                <h1>{edit ? "Editar empresa" : "Detalhes da empresa"}</h1>
            </div>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col md={12}>
                        <Form.Group controlId="razaoSocial">
                            <Form.Label>Razão Social*</Form.Label>
                            <Form.Control
                                disabled={!edit}
                                value={formik.values.razaoSocial}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.razaoSocial && formik.touched.razaoSocial}
                                type="text"
                                placeholder="Digite a razão social"
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.razaoSocial}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="status">
                            <Form.Label>Status*</Form.Label>
                            <Form.Select
                                disabled={!edit}
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.status && formik.touched.status}>
                                <option value="0">Selecionar</option>
                                <option value="1">Vigente</option>
                                <option value="2">Expirado</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{formik.errors.status}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="cnpj">
                            <Form.Label>CNPJ*</Form.Label>
                            <InputMask
                                disabled={!edit}
                                name="cnpj"
                                id="cnpj"
                                mask="99.999.999/9999-99"
                                className={`form-control ${
                                    formik.errors.cnpj && formik.touched.cnpj ? "is-invalid" : ""
                                }`}
                                value={formik.values.cnpj}
                                onChange={formik.handleChange}
                                placeholder="XX.XXX.XXX/XXXX-XX"
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.cnpj}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="dataRegistro">
                            <Form.Label>Data de Registro*</Form.Label>
                            <Form.Control
                                disabled={!edit}
                                value={formik.values.dataRegistro}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.dataRegistro && formik.touched.dataRegistro}
                                type="date"
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.dataRegistro}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex w-100 justify-content-end mt-3">
                    <div className="d-flex gap-2">
                        {edit ? (
                            <>
                                <Button onClick={handleCancel} type="button" variant="outline-secondary">
                                    Cancelar
                                </Button>
                                <Button onClick={formik.submitForm} type="button" variant="primary">
                                    Concluir
                                </Button>
                            </>
                        ) : (
                            <>
                                <ModalDelete id={id} dadosEmpresa={originalValues} />
                                <Button onClick={() => setEdit(true)} type="button" variant="primary">
                                    <FontAwesomeIcon icon={faPencil} /> Editar empresa
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Form>
        </Container>
    );
};

export default View;
