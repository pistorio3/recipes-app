import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipesCard extends Component {
  constructor() {
    super();

    this.state = {
      copied: false,
    };

    this.copyLink = this.copyLink.bind(this);
  }

  copyLink() {
    this.setState({ copied: true });

    const { recipe } = this.props;
    const { type, id } = recipe;
    copy(`http://localhost:3000/${type}s/${id}`);
  }

  render() {
    const { recipe, index } = this.props;
    const {
      name, area, category, doneDate, tags, image, alcoholicOrNot, type, id } = recipe;
    const { copied } = this.state;
    return (
      <section>
        <Link to={ `/${type}s/${id}` }>
          <div>
            <img
              src={ image }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
              width="100px"
            />
          </div>
        </Link>
        <div>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            {`${area} - ${category}`}
          </h5>
          <h5 data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</h5>

          <Link to={ `/${type}s/${id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          </Link>

          <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
          <button type="button" onClick={ this.copyLink }>
            {copied ? 'Link copiado!'
              : (
                <img
                  src={ shareIcon }
                  alt="shareIcon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />)}
          </button>
          {tags ? tags.map((tag, indexTag) => (
            <span
              key={ indexTag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>)) : null}
        </div>
      </section>
    );
  }
}

DoneRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(string),
    image: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
  }),
  index: PropTypes.string,
}.isRequired;

export default DoneRecipesCard;
