"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Input, Button, Form, Typography, Card, message, Row, Col } from "antd";
import Image from "next/image";
import { login } from "@/app/(auth)/login/actions";

const { Title } = Typography;

type SignInFormProps = {
  logoSrc: string;
  brandName: string;
};

const SignInForm = ({ logoSrc, brandName }: SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await login(formData);
    } catch (err) {
      message.warning("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card>
          <Row justify="center" align="middle" style={{ marginBottom: 24 }}>
            <Image src={logoSrc} alt="logo" width={60} height={60} />
            <Title level={2} style={{ marginLeft: 16, marginBottom: 0 }}>
              {brandName}
            </Title>
          </Row>
          <Title level={3} style={{ textAlign: "center" }}>
            Inicia sesión
          </Title>
          <Form layout="vertical" onSubmitCapture={handleSubmit}>
            <Form.Item
              label="Correo electrónico"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu correo electrónico!",
                },
              ]}
            >
              <Input
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña!" },
              ]}
            >
              <Input.Password
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignInForm;
