import * as React from 'react';
import {Switch, Route, useHistory, useLocation, useParams} from 'react-router-dom';

const PageFooter = (props) => {
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

export default React.memo(PageFooter);
