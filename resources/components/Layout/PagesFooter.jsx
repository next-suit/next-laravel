import * as React from 'react';
import {Switch, Route, useHistory, useLocation, useParams} from 'react-router-dom';

export default function PageFooter(props) {
    const [list, setList] = React.useState({});

    React.useEffect(() => {
        init();
    });

    async function init() {
        // let res = await ;
    }

    return (
        <div>

        </div>
    );
}
