"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Input, Button, Form, Typography, Layout, Card, message } from "antd";
import Image from "next/image";
import { login } from "@/app/(auth)/login/actions";

const { Title } = Typography;
const { Content } = Layout;

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
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Card
            style={{
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
              padding: "24px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <Image src={logoSrc} alt="logo" width={50} height={50} />
              <Title
                level={2}
                style={{ marginLeft: "8px", marginBottom: 0, color: "#001529" }}
              >
                {brandName}
              </Title>
            </div>
            <Title level={3} style={{ color: "#001529" }}>
              Inicia sesión
            </Title>
            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <Form.Item
                label="Correo electrónico"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                ]}
              >
                <Input
                  id="email"
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
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#001529",
                    borderColor: "#001529",
                  }}
                  loading={loading}
                >
                  Iniciar Sesión
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};
export default SignInForm;
