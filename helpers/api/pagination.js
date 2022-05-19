export const defaultPerPage = 20


export class PaginatedList {
    constructor({ list, perPage = defaultPerPage }) {
        this.listArg = list
        this.perPage = perPage
    }

    get list () {
        // if our list is a function, call it
        if ( typeof this.listArg === 'function' ) {
            return this.listArg()
        }

        return this.listArg
    }

    get total () {
        return this.list.length
    }

    get pageCount () {
        return Math.ceil( this.total / this.perPage )
    }

    makePageItems ( pageNumber ) {
        const start = (pageNumber - 1) * this.perPage
        const end = start + this.perPage

        return this.list.slice(start, end)
    }

    makePage ( pageNumber ) {
        const items = this.makePageItems( pageNumber )

        return {
            number: pageNumber,
            items,
            get json() {
                return JSON.stringify( items )
            }
        }
    }

    get pages () {
        // Create an empty array of pages
        const pages = Array( this.pageCount ).fill({})

        return pages.map( ( _, index ) => {
            const pageNumber = index + 1

            return this.makePage( pageNumber )
        })
    }
}



