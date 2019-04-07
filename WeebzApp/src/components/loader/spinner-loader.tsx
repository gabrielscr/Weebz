import {Component} from '@stencil/core';

@Component({
    tag: 'spinner-loader'
})
export class SpinnerLoader {
    render(){
        return (
            <center><ion-spinner name="dots"></ion-spinner></center>
        );
    }
}
