import { useSelector } from 'react-redux';
import { Modal, Col, Row, } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import CurrencyFormat from 'react-currency-format';

function ListCar(props) {

 const {
        getDetailCarResult,
        getDetailCarLoading,
    } = useSelector((state) => state.CarsReducer)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Detail Mobil
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {getDetailCarResult ? (
                    getDetailCarResult.map((car) => {
                        return (
                            <Row key={car.id}>
                                <Col md="5">
                                    <img className="w-100" src={"https://github.com/fnurhidayat/probable-garbanzo/blob/main/public" + car.image.slice(1) + "?raw=true"} alt={car.type} />
                                </Col>
                                <Col md="7">
                                    <Row className="d-flex align-items-center justify-content-center">
                                        <Col md="4"><p className="text-muted">Nama Model:</p></Col>
                                        <Col md="8"><p className="text-end fw-bold fs-3">{`${car.manufacture} ${car.model}`}</p></Col>
                                    </Row>
                                    <Row className="d-flex align-items-center justify-content-center">
                                        <Col md="4"><p className="text-muted">Harga Sewa:</p></Col>
                                        <Col md="8">
                                            <p className="text-end fw-bold fs-5 text-danger"><CurrencyFormat value={car.rentPerDay} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /> / hari</p>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex align-items-center justify-content-center">
                                        <Col md="4"><p className="text-muted">Tipe:</p></Col>
                                        <Col md="8"><p className="text-end fs-5">{car.type}</p></Col>
                                    </Row>
                                    <Row className="d-flex align-items-center justify-content-center">
                                        <Col md="4"><p className="text-muted">Transmisi:</p></Col>
                                        <Col md="8"><p className="text-end fs-5">{car.transmission}</p></Col>
                                    </Row>
                                    <Row className="d-flex align-items-center justify-content-center">
                                        <Col md="4"><p className="text-muted">Nomor Polisi:</p></Col>
                                        <Col md="8"><p className="text-end fs-5">{car.plate}</p></Col>
                                    </Row>
                                    <Row className="d-flex align-items-center justify-content-center">
                                        <Col md="4"><p className="text-muted">Kapasitas</p></Col>
                                        <Col md="8"><p className="text-end fs-5">{car.capacity} Orang</p></Col>
                                    </Row>
                                    <p className="text-muted">Keterangan:</p>
                                    <p>{car.description}</p>
                                    <p className="text-muted">Spesifikasi:</p>
                                    {car.specs.map((item) =>
                                    (
                                        item.length < 75 ? (
                                            <div key={item} className="badge me-1" style={{ background: "#5CB85F" }}>{item}</div>
                                        ) : (
                                            <div key={item} className="badge me-1" style={{ background: "#5CB85F" }}>{item.slice(0, 70)}...</div>
                                        )
                                    )
                                    )}
                                </Col>
                            </Row>
                        )
                    })
                ) : getDetailCarLoading ? <LoadingSpinner /> : "Data Kosong"}
            </Modal.Body>
        </Modal >
    )
}

export default ListCar;