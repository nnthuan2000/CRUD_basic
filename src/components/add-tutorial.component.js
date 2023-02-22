import React, { Component } from 'react';
import TuTorialDataService from '../services/tutorial.service';

const AddTutorial = () => {
    const initialTutorialValue = {
        id: null,
        title: '',
        description: '',
        published: false,
    };

    const [tutorial, setTutorial] = React.useState(initialTutorialValue);
    const [submitted, setSubmiited] = React.useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTutorial((prevValue) => ({ ...prevValue, [name]: value }));
    };

    const saveTutorial = () => {
        const data = {
            title: tutorial.title,
            description: tutorial.description,
        };

        TuTorialDataService.create(data)
            .then((response) => {
                setTutorial({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,
                });
                setSubmiited(true);
                console.log(response.data);
            })
            .catch((e) => console.log(e));
    };

    const newTutorial = () => {
        setTutorial(initialTutorialValue);
        setSubmiited(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={tutorial.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={tutorial.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={saveTutorial} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddTutorial;
