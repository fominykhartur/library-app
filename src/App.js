import React, { Component } from 'react';
import Table from './Table/Table';
import Loader from './Loader/Loader';
import TableSearch from './TableSearch/TableSearch';
import CategoriesMenu from './CategoriesMenu/CategoriesMenu'
import ProgressBar from './ProgressBar/ProgressBar'
import _ from 'lodash';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL + (process.env.REACT_APP_SERVER_LOCAL === 'NO' ? '/' : '')

class App extends Component {
    state = {
        isLoading: true,
        data: [],
        categories: [],
        choosedCategorie: 0,
        search: '',
        sort: 'asc', // 'desc'
        sortField: 'id', // поле по умолчанию
        needReloaded: false
    }

    async componentDidMount() {
        console.log('___________________');
        console.log(process.env.REACT_APP_SERVER_LOCAL)
        console.log(REACT_APP_API_URL)
        const responseData = await fetch(`${REACT_APP_API_URL}books`)
        const data = await responseData.json()
        console.log(data)
        const responseCategories = await fetch(`${REACT_APP_API_URL}categories`)
        const categories = await responseCategories.json()
        console.log(categories)
        this.setState({
            isLoading: false,
            data: _.orderBy(data, this.state.sortField, this.state.sort),
            categories: categories
        })
        // console.log(this.state);
    }

    onSort = sortField => {

        const cloneData = this.state.data.concat();
        const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
        const data = _.orderBy(cloneData, sortField, sort);

        this.setState({
            data,
            sort,
            sortField
        })
    }

    searchHandler = search => {
        this.setState({ search });
        // console.log({ search })
    }

    changeCategoryHandler = choosedCategorie =>{
        this.setState({choosedCategorie});
        // console.log({choosedCategorie})
    }

    reloadHandler = isLoading =>{
        this.setState({ isLoading });
        this.componentDidMount();
        // console.log({ isLoading})
    }

    getFilteredData() {
        const { data, search } = this.state

        let categorized_data = data.filter(item =>item.categoria == this.state.choosedCategorie)


        if (this.state.choosedCategorie == "0"){
            categorized_data = data;
        }

        console.log('nd',categorized_data);

        if (!search) {
            return categorized_data
        }

        return categorized_data.filter(item => {
            return item['author'].toLowerCase().includes(search.toLowerCase()) ||
                item['name'].toLowerCase().includes(search.toLowerCase()) ||
                item['subcycle'].toLowerCase().includes(search.toLowerCase()) ||
                item['status'].toLowerCase().includes(search.toLowerCase())
        })
    }


    render() {
        const filteredData = this.getFilteredData();
        console.log(this.state);
        return (
            <div className = "container" >
            {
              this.state.isLoading 
              ? <Loader />
              : <React.Fragment>
              <div class="container">
                  <div class="row">
                    <div class="col-sm">
                      <CategoriesMenu 
                      categories={this.state.categories}
                      onCategoryChange={this.changeCategoryHandler} />
                    </div>
                    <div class="col-sm">
                      <ProgressBar data={filteredData} />
                    </div>
                  </div>
                </div>
              <TableSearch onSearch={this.searchHandler} />
              <Table 
              data={filteredData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              reloadData={this.reloadHandler}
              choosedCategorie={this.state.choosedCategorie}
              />
              </React.Fragment> 
            }
      </div>
        );
    }
}

export default App;