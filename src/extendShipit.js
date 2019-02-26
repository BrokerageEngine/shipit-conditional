function extendShipit(shipit) {
  const Shipit = shipit.constructor;


  /**
   * Run a command remotely if the condition passes.
   *
   * @params {function} conditionFunction - this will be passed one connection at a time. If the condition passes it will execute the remote task
   * @param {string} command
   * @returns {ExecResult}
   * @throws {ExecError}
   */
  Shipit.prototype.remoteWithCondition = async function remoteWithCondition(conditionFunction, command, options) {
    return this.pool.runWithCondition(conditionFunction,command, options)
  }

  /**
   * Copy from local to remote or vice versa if the condition passes..
   *
   * @params {function} conditionFunction - this will be passed one connection at a time. If the condition passes it will execute the remote task
   * @param {string} src
   * @param {string} dest
   * @returns {ExecResult|MultipleExecResult}
   * @throws {ExecError}
   */
  Shipit.prototype.remoteCopyWithCondition =  async function remoteCopyWithCondition(conditionFucntion, src, dest, options) {

    return this.pool.copyWithCondition(conditionFunction, src, dest, this._optionsForCopy(options))
  }

  /**
   * Run a copy from the local to the remote using rsync if the condition passes.
   * All exec options are also available.
   *
   * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback
   * 
    * @params {function} conditionFunction - this will be passed one connection at a time. If the condition passes it will execute the remote task
   * @param {string} src
   * @param {string} dest
   * @param {object} [options] Options
   * @param {string[]} [options.ignores] Specify a list of files to ignore.
   * @param {string[]|string} [options.rsync] Specify a set of rsync arguments.
   * @returns {MultipleExecResult}
   * @throws {ExecError}
   */
  Shipit.prototype.copyToRemoteWithCondition =  async function copyToRemoteWithCondition(conditionFunction,src, dest, options) {

    return this.pool.copyToRemoteWithCondition(conditionFunction, src, dest, this._optionsForCopy(options))
  }

  /**
   * Run a copy from the remote to the local using rsync if the condition passes.
   * All exec options are also available.
   *
   * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback\
   *
     * @params {function} conditionFunction - this will be passed one connection at a time. If the condition passes it will execute the remote task
   * @param {string} src Source
   * @param {string} dest Destination
   * @param {object} [options] Options
   * @param {string[]} [options.ignores] Specify a list of files to ignore.
   * @param {string[]|string} [options.rsync] Specify a set of rsync arguments.
   * @returns {MultipleExecResult}
   * @throws {ExecError}
   */
  Shipit.prototype.copyFromRemoteWithCondition =  async function  copyFromRemoteWithCondition(conditionFunction, src, dest, options) {
    return this.pool.copyFromRemoteWithCondition(conditionFunction, src, dest, this._optionsForCopy(options))
  }
 /**
 * Build the default options for a copy
   */
  Shipit.prototype._defaultOptionsForCopy = function _defaultOptionsForCopy() {
    return( {
      ignores: this.config && this.config.ignores ? this.config.ignores : [],
      rsync: this.config && this.config.rsync ? this.config.rsync : [],
    });
  }
  /**
   * Resolve the options for copying
   */
  Shipit.prototype._optionsForCopy = function _optionsForCopy(options) {
    return( { ...this._defaultOptionsForCopy(), ...options });

  }
}
module.exports = extendShipit;
