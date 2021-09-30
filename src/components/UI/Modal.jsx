import { Fragment } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = () => <div className={styles.backdrop} />;

const ModalOverlay = (props) => {
	return (
		<div className={styles.modal}>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

const portalEl = document.getElementById('overlays');

const Modal = (props) => {
	return (
		<div>
			<Fragment>
				{createPortal(<Backdrop />, portalEl)}
				{createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEl)}
			</Fragment>
		</div>
	);
};

export default Modal;
