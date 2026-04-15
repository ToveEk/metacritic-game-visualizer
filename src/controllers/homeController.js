/**
 * Controller for handling requests to the home page.
 */
export class HomeController {

    /**
     * Renders the home page.
     * 
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     */
    renderHomePage(req, res) {
        res.render('home')
    }
}