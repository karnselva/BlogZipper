import { Button, Container, Row } from "react-bootstrap"
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div className="landing-container">
      <Container>
        <Row>
            <div className="intro-text">
               <div>
                <h1>
                     Welcome to Blog Zipper
                </h1>
                <p>
                   One  Place For All Tech Blog.
                </p>
               </div>
               <div className="button-container">
                    <a href="/login">
                       <Button size="lg">Login</Button>
                    </a>
                    <a href="/register">
                       <Button size="lg" variant="outline-primary">signup</Button>
                    </a>
               </div>

            </div>
        </Row>
      </Container>
    </div>
  )
}
