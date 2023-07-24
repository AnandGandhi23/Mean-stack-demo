export default (fun: any) => {
	return (req: any, res: any, next: any) => {
		fun(req, res, next).catch(next)
	}
}
