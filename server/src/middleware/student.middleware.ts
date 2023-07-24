import { Request, Response } from 'express'
import { AppError } from '../util/app-error.util'

const emailValidate = (email: string) => {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/
	if (!emailRegex.test(email)) return false

	return true
}

const studentMiddleware = (req: Request, res: Response, next: any) => {
	const missingValues: any[] = []
	if (!req.body.firstName) missingValues.push('First Name')
	if (!req.body.lastName) missingValues.push('Last Name')
	if (!req.body.email) missingValues.push('Email address')
	if (!req.body.phone) missingValues.push('Phone number')

	if (missingValues.length > 0)
		return next(
			new AppError(`Required missing values : ${missingValues.join(', ')}`, 400)
		)

	if (!emailValidate(req.body.email)) {
		return next(new AppError('Invalid email address.', 400))
	}

	next()
}

export { studentMiddleware }
