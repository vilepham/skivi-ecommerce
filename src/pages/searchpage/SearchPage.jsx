import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors';

import FormInput from '../../components/form-input/FormInput';
import FilteredItemsList from '../../components/filtered-items-list/FilteredItemList';
import WithSpinner from '../../components/with-spinner/withSpinner';

import './SearchPage.scss';

const FilteredItemsListWithSpinner = WithSpinner(FilteredItemsList);

const SearchPage = ({ fetchCollectionsAsync, isCollectionLoaded }) => {
    const [keyword, setKeyword] = useState('');

    const handleSearchChange = (e) => {
        setKeyword(e.target.value)
    }
    
    useEffect(() => {
        fetchCollectionsAsync()
    }, [fetchCollectionsAsync])

    return (
        <div className='search-page'>
            <form>
                <FormInput 
                    name='keyword'
                    type='text'
                    value={keyword}
                    handleChange={handleSearchChange}
                    placeholder='Search an item...'
                />
            </form>

            <FilteredItemsListWithSpinner isLoading={!isCollectionLoaded} keyword={keyword} />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    isCollectionLoaded: selectIsCollectionLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsAsync: () => dispatch(fetchCollectionsAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);