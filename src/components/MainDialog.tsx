import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { AppDispatch, ReduxState } from "~store/index";
import TranslateButton from "./TranslationHelpers/Button";

const Transition = props => <Slide direction="left" {...props} />;

// redux actions
import { closeModal } from "~actions/modal";

interface IState {
}

interface IProps {
}

class MainDialog extends React.Component<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & IProps> {
    state: IState;

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const { modalOpen, modalTitle, modalText } = this.props;

        let fixedModalText = <DialogContentText>{modalText}</DialogContentText>;
        if (modalText) {
            // if multiline, user multiple typographies to show the newlines
            const splitTexts = modalText.split("\n");
            fixedModalText = splitTexts.map(splitText => <Typography variant="body1">{splitText}</Typography>);
        }

        return (
            <Dialog open={modalOpen} TransitionComponent={Transition} onClose={this.props.closeModal}>
                <DialogTitle>{modalTitle}</DialogTitle>
                <DialogContent>{fixedModalText}</DialogContent>
                <DialogActions>
                    <TranslateButton variant="contained" onClick={this.props.closeModal} color="primary">
                        Ok
                    </TranslateButton>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        modalText: state.modal.message,
        modalTitle: state.modal.title,
        modalOpen: state.modal.modalOpen
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainDialog);