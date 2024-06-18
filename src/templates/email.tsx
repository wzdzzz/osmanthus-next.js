import * as React from "react"
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { getTranslations } from "next-intl/server"

interface EmailProps {
  baseUrl?: string
  namespace?: string
}

export default async function Email({
  baseUrl,
  namespace = "activate",
}: EmailProps) {
  const t = await getTranslations(namespace)

  return (
    <Html>
      <Head />
      <Preview>Web NextJS</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>Web NextJS</Section>
            <Section style={upperSection}>
              <Heading style={h1}>{t("emailTitle")}</Heading>
              <Text style={mainText}>
                {t("emailContent1")}
                {t("emailContent2")}
              </Text>
              <Section style={verificationSection}>
                <Link style={link} href={baseUrl}>
                  👉 {t("emailButton")} 👈
                </Link>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>{t("emailFooter")}</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
}

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
}

const h1 = {
  color: "#fff",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
}

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
}

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
}

const imageSection = {
  color: "#fff",
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
}

const coverSection = { backgroundColor: "#fff" }

const upperSection = { padding: "25px 35px" }

const lowerSection = { padding: "25px 35px" }

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const mainText = { ...text, marginBottom: "14px" }

const cautionText = { ...text, margin: "0px" }
