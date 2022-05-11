import {Col, ListGroup, Row, Tab} from "react-bootstrap";
import {Line} from "react-chartjs-2";

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Cortante",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
        },
        {
            label: "Momento",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774"
        }
    ]
};

const data2 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Momento",
            data: [33, 25, 35, 51, 54, 76],
            fill: true,
            backgroundColor: "rgba(171,75,192,0.2)",
            borderColor: "rgb(139,75,192)"
        },
        {
            label: "Cortante",
            data: [33, 53, 85, 41, 44, 65],
            fill: false,
            borderColor: "#277428"
        }
    ]
};

const Chart = () => {
    return (
        <Tab.Container id="list-group-tabs" defaultActiveKey="#cutting">
            <Row>
                <Col sm={2}>
                    <ListGroup>
                        <ListGroup.Item action href="#cutting">
                            Cortante
                        </ListGroup.Item>
                        <ListGroup.Item action href="#moment">
                            Momento
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#cutting">
                            <Line data={data}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#moment">
                            <Line data={data2}/>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    );
}

export default Chart;