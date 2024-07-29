import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import InputMask from "react-input-mask";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { useFormik } from "formik";
import { validationSchema } from "../../utils/validationSchema";
import axios from "axios";
import { toast } from "react-toastify";

interface FormValues {
    razaoSocial: string;
    status: number;
    cnpj: string;
    dataRegistro: string;
}

const Register: React.FC = () => {
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
                .post("http://localhost:3001/api/empresa", values)
                .then(() => {
                    toast.success("Empresa cadastrada com sucesso!");
                    navigate("/");
                })
                .catch((errors) => {
                    if (errors.response.data.errors) {
                        toast.error(`Erro ao cadastrar empresa: ${errors.response.data.errors.join("\n")}`);
                    } else {
                        toast.error("Erro ao cadastrar empresa");
                    }
                });
        },
    });

    return (
        <Container>
            <div className="d-flex align-items-center gap-3">
                <Link to="/" className="chevron-back">
                    <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </Link>
                <h1>Adicionar Empresa</h1>
            </div>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col md={12}>
                        <Form.Group controlId="razaoSocial">
                            <Form.Label>Razão Social*</Form.Label>
                            <Form.Control
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
                                value={formik.values.dataRegistro}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.status && formik.touched.dataRegistro}
                                type="date"
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.dataRegistro}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex w-100 justify-content-end mt-3">
                    <div className="d-flex gap-2">
                        <Link to="/" className="btn btn-secondary">
                            Cancelar
                        </Link>
                        <Button type="submit" variant="primary">
                            Salvar
                        </Button>
                    </div>
                </div>
            </Form>
        </Container>
    );
};

export default Register;
