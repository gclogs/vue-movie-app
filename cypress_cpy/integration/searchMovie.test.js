/**
 * 검색(메인) 페이지로 접근한 후,
 * 영화제목을 'frozen'으로, 표시 개수를 30개로 입력한 뒤,
 * 'Apply' 버튼을 클릭해 영화목록을 검색합니다.
 * 영화목록 30개가 출력되면,
 * 영화목록에서 'Frozen II'(겨울왕국2) 영화아이템을 클릭하여
 * 영화 상세 정보 페이지로 이동합니다.
 * 상세 정보 페이지에서 정보를 확인할 수 있습니다.
 */

describe('영화 검색(겨울왕국2)', () => {
    it('검색 페이지로 이동합니다.', () => {
        cy.visit('/')
        cy.get('header .nav-link.active')
            .contains('Search')
    })
    it('영화를 검색합니다', () => {
        cy.get('input.form-control')
            .type('frozen')
        cy.get('select.from-select::nth-child(2)')
            .select(30)
        cy.get('button.btn')
            .contains('Apply')
            .click()
        cy.wait(2000)
        cy.get('.movie')
            .should('have.length', 30)
    })
    it('겨울왕국2 아이템을 클릭합니다.', () => {
        cy.get('.movie .title')
            .contains('Frozen II')
            .click()
    })
    it('영화 상제 정보를 확인합니다.', () => {
        cy.url()
            .should('include', '/movie/tt4520988')
        cy.wait(1000)
        cy.get('header .nav-link.active')
            .contains('Movie')
        cy.get('.title')
            .contains('Frozen II')
    })
})