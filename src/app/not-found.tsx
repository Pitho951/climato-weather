import { Button } from "react-bootstrap";

export default async function Page() {
    return <div style={{ padding: 40, textAlign: "center" }}>
        <h1>😕 Página não encontrada</h1>
        <p>A página que você tentou acessar não existe.</p>
        <Button href="/"> Voltar para a Home</Button>
    </div>
}