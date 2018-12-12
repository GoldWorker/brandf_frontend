module.exports = function(env) {
	console.log(env || 'dev')
	return require(`./webpack.${env||'dev'}.js`)
}